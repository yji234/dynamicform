import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Switch } from 'antd';
import { useHistory } from 'react-router-dom';
import { addForm } from '../api';
import './ConfigBaseInfo.scss';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
};

interface ConfigBaseInfoProps{
  modifyItem: any;
}

const ConfigBaseInfo: FC<ConfigBaseInfoProps> = (props) => {
  const { modifyItem } = props;
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [operateType, setOperateType] = useState('add');

  const handleCancel = useCallback(() => {
    setVisible(false);
    setLoading(false);
  }, []);

  const handleFinish = (value: any): any => {
    setLoading(true);
    addForm(value).then((res) => {
      const result: any = res.data;
      history.push(`/formother/create-form-set-attr/${result.parentId}/${operateType}`);
      handleCancel();
    });
  };

  const handleConfigBaseInfo = useCallback(() => {
    form.resetFields();
    setVisible(true);
  }, [form]);

  useEffect(() => {
    if(modifyItem) {
      setVisible(true);
      form.setFieldsValue(modifyItem);
      setOperateType('modify');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modifyItem]);

  return (
    <div className="config-base-info">
      <Button type="primary" size="small" style={{ marginBottom: '20px' }} onClick={handleConfigBaseInfo}>新增</Button>
      <Modal
        title="新增/修改-配置表单基础信息"
        visible={visible}
        closable={false}
        footer={null}
      >
        <Form {...layout} form={form} name="configBaseInfo" onFinish={handleFinish}>
          <Form.Item name="_id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item name="create_time" style={{ display: 'none' }}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="表单名称" rules={[{ required: true, message: '请输入表单名称，不超过20字' }]}>
            <Input maxLength={20} placeholder="请输入表单名称" />
          </Form.Item>
          <Form.Item name="desc" label="表单描述" rules={[{ required: true, message: '请输入表单描述，不超过50字' }]}>
            <Input maxLength={50} placeholder="请输入表单描述" />
          </Form.Item>
          <Form.Item name="status" label="状态" initialValue={true}>
            <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button key="back" style={{ marginRight: '10px' }} onClick={handleCancel}>取消</Button>
            <Button key="submit" type="primary" loading={loading} htmlType="submit">确认</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
 
export default ConfigBaseInfo;
  