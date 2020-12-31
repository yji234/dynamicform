import React, { FC, useCallback, useEffect, useState } from 'react';
import { Tree, Button, message } from 'antd';
import _ from 'lodash';
import './MenuManage.scss';
import AddEditMenu from '../component/AddEditMenu';
import { getMenu, deleteMenu } from '../api/index';

const MenuManage: FC<{}> = () => {
  const [selectMenu, setSelectMenu] = useState<any>();
  const [treeData, setTreeData] = useState<any>([
    // {
    //   title: (item: any) => (
    //     <>
    //       <span style={{ marginRight: '10px' }}>菜单管理</span>
    //       <Button type="link" size="small" onClick={() => handleAdd(item.key)}>新增</Button>
    //       <Button type="link" size="small" onClick={() => handleEdit(item.key)}>编辑</Button>
    //       <Button type="link" size="small" danger onClick={() => handleDelete(item.key)}>删除</Button>
    //     </>
    //   ),
    //   key: '0',
    //   children: [
    //     {
    //       title: (item: any) => (
    //         <>
    //           <span style={{ marginRight: '10px' }}>菜单管理</span>
    //           <Button type="link" size="small" onClick={() => handleEdit(item.key)}>编辑</Button>
    //           <Button type="link" size="small" danger onClick={() => handleDelete(item.key)}>删除</Button>
    //         </>
    //       ),
    //       key: '00',
    //     },
    //   ],
    // },
    // {
    //   title: (item: any) => (
    //     <>
    //       <span style={{ marginRight: '10px' }}>项目管理</span>
    //       <Button type="link" size="small" onClick={() => handleAdd(item.key)}>新增</Button>
    //       <Button type="link" size="small" onClick={() => handleEdit(item.key)}>编辑</Button>
    //       <Button type="link" size="small" danger onClick={() => handleDelete(item.key)}>删除</Button>
    //     </>
    //   ),
    //   key: '1',
    //   children: [
    //     {
    //       title: (item: any) => (
    //         <>
    //           <span style={{ marginRight: '10px' }}>项目信息</span>
    //           <Button type="link" size="small" onClick={() => handleEdit(item.key)}>编辑</Button>
    //           <Button type="link" size="small" danger onClick={() => handleDelete(item.key)}>删除</Button>
    //         </>
    //       ),
    //       key: '10',
    //     },
    //     {
    //       title: (item: any) => (
    //         <>
    //           <span style={{ marginRight: '10px' }}>标注信息</span>
    //           <Button type="link" size="small" onClick={() => handleEdit(item.key)}>编辑</Button>
    //           <Button type="link" size="small" danger onClick={() => handleDelete(item.key)}>删除</Button>
    //         </>
    //       ),
    //       key: '11',
    //     },
    //     {
    //       title: (item: any) => (
    //         <>
    //           <span style={{ marginRight: '10px' }}>流程分配任务</span>
    //           <Button type="link" size="small" onClick={() => handleEdit(item.key)}>编辑</Button>
    //           <Button type="link" size="small" danger onClick={() => handleDelete(item.key)}>删除</Button>
    //         </>
    //       ),
    //       key: '12',
    //     },
    //   ],
    // },
  ]);

  const handleAdd = useCallback((item) => {
    const params = {
      parentId: item._id,
    }
    console.log('handleAdd', params);
    setSelectMenu(params);
  }, []);

  const handleEdit = useCallback((item) => {
    const params = {
      _id: item._id,
      name: item.name,
      to: item.to,
      formId: item.formId,
      parentId: item.parentId,
    }
    console.log('handleEdit', params);
    setSelectMenu(params);
  }, []);

  const handleDelete = (item: any) => {
    deleteMenu({_id: item._id}).then((res) => {
      const result: any = res;
      message.info(result.message);
      handleGetMenu();
    })
  };

  const handleSelect = useCallback(() => {

  }, []);

  const handleCheck = useCallback(() => {

  }, []);

  const handleRenderTitle = (params: any) => {
    return (
      <>
        <span style={{ marginRight: '10px' }}>{params.name}</span>
        <Button type="link" size="small" onClick={() => handleAdd(params)}>新增</Button>
        <Button type="link" size="small" onClick={() => handleEdit(params)}>编辑</Button>
        <Button type="link" size="small" danger onClick={() => handleDelete(params)}>删除</Button>
      </>
    )
  };

  const handleSetTreeData = (data: any) => {
    const newData = _.cloneDeep(data);
    // 处理数据
    // 父菜单
    const parentData = newData.filter((item: any) => !item.parentId);
    parentData.forEach((item: any) => {
      item.children = [];
      item.key = item._id;
      item.title = handleRenderTitle(item);
    })
    // 子菜单
    const childrenData = newData.filter((item: any) => item.parentId);
    childrenData.forEach((item: any) => {
      item.key = item._id;
      item.title = handleRenderTitle(item);
    })
    // 合并菜单
    childrenData.forEach((subItem: any) => {
      parentData.forEach((item: any) => {
        if(subItem.parentId === item._id) {
          item.children = [...item.children, subItem];
        }
      })
    })
    // console.log('parentData', parentData);
    setTreeData([...parentData]);
  };

  const handleGetMenu = () => {
    getMenu().then((res) => {
      const result: any = res.data;
      handleSetTreeData(result);
    })
  };

  useEffect(() => {
    handleGetMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="menu-manage">
      <AddEditMenu selectMenu={selectMenu} handleGetMenu={handleGetMenu}/>
      <Tree
        onSelect={handleSelect}
        onCheck={handleCheck}
        treeData={treeData}
      />
    </div>
  );
};

export default MenuManage;
