import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Form, Input, Radio, InputNumber } from 'antd';
import SetOptions from './SetOptions';

interface SetAttrProps{
  currentSelected: any;
  handleUpdateFormListAttr: (name: string, value: any) => void;
}

const SetAttr: FC<SetAttrProps> = (props) => {
  const {currentSelected, handleUpdateFormListAttr} = props;
  const [form] = Form.useForm();
  const [isRequired, setIsRequired] = useState<number>();
  const setOptionsRef = useRef<any>();

  const handleChangeIsRequired = useCallback((value) => {
    handleUpdateFormListAttr('isRequired', value)
    setIsRequired(value);
  }, [handleUpdateFormListAttr]);

  const handleChangeOptions = useCallback((list) => {
    console.log('list', list);
    handleUpdateFormListAttr('options', list)
  }, [handleUpdateFormListAttr]);

  useEffect(() => {
    console.log('currentSelected', currentSelected);
    if(!currentSelected) {
      return;
    }
    form.setFieldsValue(currentSelected);
    setIsRequired(currentSelected.isRequired);
    if(!currentSelected.options) {
      setOptionsRef.current.handleSetList([]);
      return;
    }
    if(setOptionsRef.current) {
      setOptionsRef.current.handleSetList(currentSelected.options);
    }
  }, [form, currentSelected]);

  return (
    <div
      className="set-attr"
      style={{ width: '400px', height: '800px', background: '#F5F5F5', padding: '20px', marginRight: '10px' }}
    >
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>设置控件属性值</h3>
      <Form form={form} name="setAttr">
        <Form.Item
          name="name"
          label="控件Name"
          rules={[{ required: true, message: '请输入控件Name，不超过15字' }]}
        >
          <Input
            maxLength={15}
            placeholder="请输入控件Name"
            onChange={(e) => handleUpdateFormListAttr('name', e.target.value)}
            disabled={!currentSelected}
          />
        </Form.Item>
        <Form.Item
          name="label"
          label="控件Label"
          rules={[{ required: true, message: '请输入控件Label，不超过15字' }]}
        >
          <Input
            maxLength={15}
            placeholder="请输入控件Label"
            onChange={(e) => handleUpdateFormListAttr('label', e.target.value)}
            disabled={!currentSelected}
          />
        </Form.Item>
        {
          currentSelected && (currentSelected.type === 'Radio' || currentSelected.type === 'Checkbox' || currentSelected.type === 'Select') && (
            <Form.Item
              name="options"
              label="控件选项"
            >
              <SetOptions
                isDisabled={!currentSelected}
                onChange={handleChangeOptions}
                setOptionsRef={setOptionsRef}
              />
            </Form.Item>
          )
        }
        <Form.Item
          name="placeHolder"
          label="提示文字"
          rules={[{ required: true, message: '请输入提示文字，不超过20字' }]}
        >
          <Input
            maxLength={20}
            placeholder="请输入提示文字"
            onChange={(e) => handleUpdateFormListAttr('placeHolder', e.target.value)}
            disabled={!currentSelected}
          />
        </Form.Item>
        <Form.Item
          name="isRequired"
          label="是否必填"
          rules={[{ required: true, message: '请选择是否必填' }]}
        >
          <Radio.Group onChange={(e) => handleChangeIsRequired(e.target.value)}>
            <Radio.Button value={1} disabled={!currentSelected}>是</Radio.Button>
            <Radio.Button value={0} disabled={!currentSelected}>否</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {
          isRequired === 1 && (
            <Form.Item
              name="message"
              label="必填提示信息"
              rules={[{ required: true, message: '请输入必填提示信息，不超过20字' }]}
            >
              <Input
                maxLength={20}
                placeholder="请输入必填提示信息"
                onChange={(e) => handleUpdateFormListAttr('message', e.target.value)}
                disabled={!currentSelected}
              />
            </Form.Item>
          )
        }
        <Form.Item
          name="isDisabled"
          label="是否禁用"
          rules={[{ required: true, message: '请选择是否禁用' }]}
        >
          <Radio.Group onChange={(e) => handleUpdateFormListAttr('isDisabled', e.target.value)}>
            <Radio.Button value={1} disabled={!currentSelected}>是</Radio.Button>
            <Radio.Button value={0} disabled={!currentSelected}>否</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="maxLength"
          label="最大长度"
        >
          <InputNumber
            disabled={!currentSelected}
            onChange={(value) => handleUpdateFormListAttr('maxLength', value)}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
 
export default SetAttr;
  