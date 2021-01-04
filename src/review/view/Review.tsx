import React, { FC, useCallback, useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import {useParams } from 'react-router-dom'
import  utils from '../../common/utils';
import { getFormListById } from '../api/index';

const { TextArea } = Input;

const Review: FC<{}> = () => {
  // const formList = useMemo(() => {
  //   if(sessionStorage.getItem('forms')) {
  //     const forms: any = sessionStorage.getItem('forms')
  //     return JSON.parse(forms)
  //   }
  // }, [])
  const { formId } = useParams<{formId: string}>();
  const [formList, setFormList] = useState<any>([]);
  const [form] = Form.useForm();
  const [chineseCapitalOfMoney, setChineseCapitalOfMoney] = useState<string>();

  const handleFinish = useCallback((values) => {
    console.log('handleFinish', values);
  }, []);

  const handleChangeMoney = useCallback((value) => {
    console.log('handleChangeMoney', value);
    console.log('大写', utils.digitalAmountConvertIntoChineseCapital(value))
    setChineseCapitalOfMoney(utils.digitalAmountConvertIntoChineseCapital(value));
  }, []);

  const handleReset = useCallback(() => {
    form.resetFields();
    setChineseCapitalOfMoney('')
  }, [form]);

  const handleGetFormListById = useCallback(() => {
    getFormListById({
      parentId: formId,
    }).then((res) => {
      console.log(res);
      const result: any = res.data;
      setFormList([...result]);
    })
  }, [formId]);

  useEffect(() => {
    console.log('formId', formId);
    handleGetFormListById();
  }, [formId, handleGetFormListById]);

  return (
    <div className="review" style={{ padding: '20px' }}>
      <Form form={form} name="setAttr" onFinish={handleFinish}>
        {
          formList && formList.length > 0 && formList.map((item: any) => (
            <div className="dynamic-form-item" key={item._id}>
              {
                item.type === 'Input' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <Input
                      maxLength={item.maxLength || 99999}
                      placeholder={item.placeHolder}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
              {
                item.type === 'TextArea' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <TextArea
                      maxLength={item.maxLength || 99999}
                      placeholder={item.placeHolder}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
              {
                item.type === 'InputNumber' && (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                  >
                    <InputNumber
                      maxLength={item.maxLength || 99999}
                      disabled={item.isDisabled ? true : false}
                    />
                  </Form.Item>
                )
              }
              {
                item.type === 'Money' && (
                  <Form.Item
                    label={item.label}
                  >
                    <Form.Item
                      className="money-item"
                      name={item.name}
                      rules={[{ required: item.isRequired ? true: false, message: item.message }]}
                      style={{ marginBottom: '0px' }}
                    >
                      <InputNumber
                        maxLength={item.maxLength || 99999}
                        disabled={item.isDisabled ? true : false}
                        onChange={handleChangeMoney}
                      />
                    </Form.Item>
                    <span>大写：{chineseCapitalOfMoney}</span>
                  </Form.Item>
                )
              }
            </div>
          ))
        }
        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={handleReset} style={{ marginLeft: '10px' }}>清空</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
 
export default Review;
