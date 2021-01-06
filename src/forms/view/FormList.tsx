import React, {
  FC,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  Table,
  Button,
  Pagination,
  message,
  Modal,
} from 'antd';
import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { useHistory } from 'react-router-dom';
import copy from 'copy-to-clipboard'
import { getFormList, deleteForm, modifyStatus } from '../api';
import { getFormListById } from '../api/formlist';
import ConfigBaseInfo from './ConfigBaseInfo';

export interface FormListItem {
  key: number;
  taskId: string;
  taskName: string;
  totalNum: number;
  unMarkNum: number;
  markNum: number;
  inspectNum: number;
  inspectNoPassNum: number;
  status: number;
}

export interface PaginationParams{
  pageNum: number;
  pageSize: number;
  totalCount: number;
}

const FormList: FC<{}> = () => {
  const columns: ColumnsType<FormListItem> = [
    {
      key: 'name',
      title: '表单名称（单击复制formId）',
      render: (item) => (
        <Button type="link" color="#1890ff" onClick={() => handleCopyFormId(item._id)}>{item.name}</Button>
      )
    },
    {
      key: 'desc',
      title: '表单描述',
      dataIndex: 'desc',
    },
    {
      key: 'status',
      title: '状态',
      render: (item) => (
        <span>
          {
            item.status
              ? <span style={{ color: '#0b8235' }}>启用</span>
              : <span style={{ color: '#d9d9d9' }}>禁用</span>
          }
        </span>
      ),
    },
    {
      key: 'create_time',
      title: '创建时间',
      render: (item) => (
        <span>{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}</span>
      ),
    },
    {
      key: 'update_time',
      title: '修改时间',
      render: (item) => (
        <span>{item.update_time ? moment(item.update_time).format('YYYY-MM-DD HH:mm:ss') : '-'}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (item) => (
        <>
          <Button
            type="primary"
            size="small"
            disabled={!item.status}
            onClick={() => handleModify(item)}
            style={{ marginRight: '10px' }}
          >
          修改
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => handleReview(item)}
            style={{ marginRight: '10px', border: '0px' }}
          >
            预览
          </Button>
          <Button
            type="primary"
            size="small"
            onClick={() => handleChangeStatus(item)}
            style={{ marginRight: '10px', background: !item.status ? '#0b8235' : '#ff4d4f', border: '0px' }}
          >
            {!item.status ? '启用' : '禁用'}
          </Button>
          <Button
            type="primary"
            size="small"
            disabled={item.status}
            onClick={() => handleDelete(item)}
          >
          删除
          </Button>
        </>
      ),
    },
  ];
  const [data, setData] = useState<FormListItem[]>();
  const [pagination, setPagination] = useState<PaginationParams>({
    pageNum: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<FormListItem>();
  const history = useHistory();

  const handleCopyFormId = useCallback((value) => {
    copy(value);
    message.info('formId复制成功')
  }, []);

  const handleReview = useCallback((item) => {
    getFormListById({ parentId: item._id }).then((res) => {
      sessionStorage.setItem('forms', JSON.stringify(res.data))
      // history.push(`/formother/review/${item._id}`);
      window.open(`/formother/review/${item._id}`);
    })
  }, [history]);

  const handleGetFormList = useCallback((params?) => {
    setLoading(true);
    const sendParmas = {
      pageNum: (params && params.pageNum) || pagination.pageNum,
      pageSize: (params && params.pageSize) || pagination.pageSize,
    };
    getFormList(sendParmas).then((res: any) => {
      const resData = [...res.data];
      resData.forEach((item: any) => {
        item.key = item._id;
      });
      if (resData.length > 0) {
        setData([...resData]);
        setPagination({ ...res.pagination });
      } else {
        setData([...res.data]);
        setPagination({
          pageNum: 1,
          pageSize: 10,
          totalCount: 0,
        });
      }
      setLoading(false);
    });
  }, [pagination]);

  const handleModifyStatusAxios = useCallback((id, status) => {
    modifyStatus({id, status}).then((res: any) => {
      message.success(res.message || '修改成功');
      handleGetFormList();
    });
  }, [handleGetFormList]);

  const handleChangeStatus = useCallback((item: any) => {
    Modal.confirm({
      title: '确认修改',
      icon: '',
      content: '您确认要修改状态吗？',
      onOk() {
        handleModifyStatusAxios(item._id, !item.status);
      },
    });
  }, [handleModifyStatusAxios]);

  const handleModify = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const handleDeleteAxios = useCallback((id) => {
    deleteForm({id}).then((res: any) => {
      message.success(res.message || '删除成功');
      handleGetFormList();
    });
  }, [handleGetFormList]);

  const handleDelete = useCallback((item) => {
    Modal.confirm({
      title: '确认删除',
      icon: '',
      content: '您确认要删除吗？',
      onOk() {
        handleDeleteAxios(item._id);
      },
    });
  }, [handleDeleteAxios]);

  const handleShowPageChange = (page: number, pageSizes: any): void => {
    const params = {
      pageNum: page,
      pageSize: pageSizes,
    };
    setPagination({ ...pagination, ...params });
    handleGetFormList(params);
  };

  const handleShowSizeChange = (current: number, pageSizes: number): void => {
    const params = {
      pageNum: current,
      pageSize: pageSizes,
    };
    setPagination({ ...pagination, ...params });
    handleGetFormList(params);
  };

  useEffect(() => {
    handleGetFormList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-list">
      <ConfigBaseInfo modifyItem={selectedItem}/>
      <Table<FormListItem>
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={loading}
        style={{ marginBottom: '20px' }}
      />
      <Pagination
        showQuickJumper
        current={pagination.pageNum}
        defaultCurrent={pagination.pageNum}
        defaultPageSize={pagination.pageSize}
        total={pagination.totalCount}
        showTotal={(total) => `共 ${total} 条`}
        onChange={handleShowPageChange}
        onShowSizeChange={handleShowSizeChange}
        style={{ textAlign: 'right' }}
      />
    </div>
  );
};

export default FormList;
