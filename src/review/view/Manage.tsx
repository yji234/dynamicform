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
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { getFormValue, deleteFormValue, getFormListById } from '../api';

export interface PaginationParams{
  pageNum: number;
  pageSize: number;
  totalCount: number;
}

const Manage: FC<{}> = () => {
  const [columns, setColumns] = useState<ColumnsType<any>>([
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
            onClick={() => handleModify(item)}
            style={{ marginRight: '10px' }}
          >
            修改
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => handleDelete(item)}
          >
            删除
          </Button>
        </>
      ),
    },
  ]);
  const [data, setData] = useState<any>();
  const [pagination, setPagination] = useState<PaginationParams>({
    pageNum: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const { formId } = useParams<{formId: string}>();
  const location = useLocation();
  const jumpTo = decodeURIComponent(location.search.split('?jumpTo=')[1]);
  const pathnameList = location.pathname.split('/');
  pathnameList.pop();
  const newPathname = pathnameList.join('/');

  const handleGetFormValueList = useCallback((params?) => {
    setLoading(true);
    const sendParmas = {
      formId,
      pageNum: (params && params.pageNum) || pagination.pageNum,
      pageSize: (params && params.pageSize) || pagination.pageSize,
    };
    getFormValue(sendParmas).then((res: any) => {
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
  }, [pagination, formId]);

  const handleGetTableTitle = useCallback(() => {
    getFormListById({parentId: formId}).then((res) => {
      const result: any = res.data;
      const newColumns: any = [];
      result.reverse().forEach((item: any) => {
        newColumns.unshift({
          key: item.name,
          title: item.label,
          dataIndex: item.name,
        })
      });
      setColumns([
        ...newColumns,
        ...columns
      ]);
      handleGetFormValueList();
    });
  }, [formId, columns, handleGetFormValueList]);

  const handleModify = useCallback((item) => {
    history.push(jumpTo + '/' + formId + '?id=' + item._id + '&jumpTo=' + newPathname);
  }, [history, jumpTo, formId, newPathname]);

  const handleDeleteAxios = useCallback((_id: string) => {
    deleteFormValue({_id}).then((res: any) => {
      message.success(res.message || '删除成功');
      handleGetFormValueList();
    });
  }, [handleGetFormValueList]);

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
    handleGetFormValueList(params);
  };

  const handleShowSizeChange = (current: number, pageSizes: number): void => {
    const params = {
      pageNum: current,
      pageSize: pageSizes,
    };
    setPagination({ ...pagination, ...params });
    handleGetFormValueList(params);
  };

  useEffect(() => {
    handleGetTableTitle();
    // handleGetFormValueList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form-list">
      <Table
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

export default Manage;
