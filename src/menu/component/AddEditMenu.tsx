import React, { FC, useCallback, useEffect, useState } from 'react';
import { Modal, Form, Button, Input, message, Radio } from 'antd';
import { addMenu, updateMenu } from '../api/index';

interface AddEditMenuProps{
  selectMenu: any;
  handleGetMenu: () => void;
}

const AddEditMenu: FC<AddEditMenuProps> = (props) => {
  const { selectMenu, handleGetMenu } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdd = useCallback(() => {
    setVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setLoading(false);
    setVisible(false);
    form.resetFields();
    handleGetMenu();
  }, [form, handleGetMenu]);

  const handleAddMenu = useCallback((value) => {
    console.log('handleAddMenu', value);
    addMenu(value).then((res) => {
      const result: any = res;
      message.info(result.message);
      handleCancel();
      window.location.reload();
    })
  }, [handleCancel]);

  const handleEditMenu = useCallback((value) => {
    console.log('handleEditMenu', value);
    updateMenu(value).then((res) => {
      const result: any = res;
      message.info(result.message);
      handleCancel();
      window.location.reload();
    });
  }, [handleCancel]);

  /**
   * 0: 什么也不做
   * 1: add
   * 2: edit
  */
  const handleIsAddOrEdit = useCallback((): number => {
    /**
     * _id为空 
     * parentId为空的时候为新增父菜单-------这个不存在
     * parentId不为空的时候为新增子菜单
     * 
     * _id不为空 
     * parentId为空的时候为编辑父菜单
     * parentId不为空的时候为编辑子菜单
    */
    if(!selectMenu._id && !selectMenu.parentId) {
      console.log('新增父菜单');
      return 1;
    }
    if(!selectMenu._id && selectMenu.parentId) {
      return 1;
    }
    if(selectMenu._id && !selectMenu.parentId) {
      return 2;
    }
    if(selectMenu._id && selectMenu.parentId) {
      return 2;
    } 
    return 0
  }, [selectMenu]);

  const handleFinish = useCallback((value) => {
    setLoading(true);
    if(!selectMenu) {
      console.log('新增父菜单');
      handleAddMenu(value);
      return;
    }
    const params = {
      ...selectMenu,
      ...value,
    }
    const isAddOrEdit = handleIsAddOrEdit();
    if(isAddOrEdit === 1) {
      handleAddMenu(params);
    } 
    if(isAddOrEdit === 2) {
      handleEditMenu(params);
    }  
  }, [selectMenu, handleIsAddOrEdit, handleAddMenu, handleEditMenu]);

  useEffect(() => {
    if(!selectMenu) {
      return;
    }
    const isAddOrEdit: number = handleIsAddOrEdit();
    console.log(isAddOrEdit)
    if(isAddOrEdit === 1) {
      setVisible(true);
    } 
    if(isAddOrEdit === 2) {
      form.setFieldsValue(selectMenu);
      setVisible(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectMenu]);

  return (
    <div className="add-edit-menu">
      <Button
        type="primary"
        size="small"
        onClick={handleAdd}
        style={{ marginBottom: '20px' }}
      >
        新增
      </Button>
      <Modal
        visible={visible}
        title="新增/编辑菜单"
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        wrapClassName="add-edit-menu-modal"
      >
        <Form
          name="add-edit-menu"
          onFinish={handleFinish}
          form={form}
        >
          <Form.Item name="name" label="菜单名称" rules={[{ required: true, message: '请输入' }]}>
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
          <Form.Item name="to" label="对应路径" rules={[{ required: true, message: '请输入' }]}>
            <Input placeholder="请输入菜单对应路径" />
          </Form.Item>
          <Form.Item name="jumpTo" label="跳转路径">
            <Input placeholder="请输入跳转路径" />
          </Form.Item>
          <Form.Item name="formIdType" label="表单ID所属种类">
            <Radio.Group>
              <Radio value="form">form</Radio>
              <Radio value="list">list</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="formId" label="表单ID">
            <Input placeholder="请输入表单ID" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="small">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEditMenu;
