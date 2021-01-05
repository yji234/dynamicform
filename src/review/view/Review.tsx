import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { useParams, useLocation, useHistory } from 'react-router-dom'
import  utils from '../../common/utils';
import { getFormListById, addFormValue, getFormValueItem, modifyFormValue } from '../api/index';

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
  const history = useHistory();
  const location = useLocation();
  // 跳转路径
  const urlSearch: any = useMemo(() => {
    if(!location.search) {
      return;
    }
    const search = decodeURIComponent(location.search).split('?')[1].split('&');
    let state = {};
    search.forEach((item) => {
      state = {
        ...state,
        [item.split('=')[0]]: item.split('=')[1],
      }
    });
    return state;
  }, [location.search])
  // console.log('urlSearch', urlSearch);
  const newPathname = useMemo(() => {
    const pathnameList = location.pathname.split('/');
    pathnameList.pop();
    return pathnameList.join('/');
  }, [location.pathname]);
  // console.log('newPathname', newPathname);

  const handleAdd = useCallback((values) => {
    addFormValue({
      formId,
      ...values,
    }).then((res) => {
      console.log(res);
      const result: any = res;
      message.info(result.message);
      if (location.search) {
        history.push(urlSearch.jumpTo + '/' + formId + '?jumpTo=' + newPathname);
      }
    })
  }, [formId, history, urlSearch, newPathname, location]);

  const handleModify = useCallback((values) => {
    console.log(
      {
        formId,
        ...values,
        _id: urlSearch.id,
      }
    )
    modifyFormValue({
      formId,
      ...values,
      _id: urlSearch.id,
    }).then((res) => {
      console.log(res);
      const result: any = res;
      message.info(result.message);
      history.push(urlSearch.jumpTo + '/' + formId + '?jumpTo=' + newPathname);
    })
  }, [formId, history, urlSearch, newPathname]);

  const handleFinish = useCallback((values) => {
    if (urlSearch && urlSearch.id) {
      handleModify(values);
    } else {
      handleAdd(values);
    }
    
  }, [urlSearch, handleModify, handleAdd]);

  const handleChangeMoney = useCallback((value) => {
    console.log('handleChangeMoney', value);
    console.log('大写', utils.digitalAmountConvertIntoChineseCapital(value))
    setChineseCapitalOfMoney(utils.digitalAmountConvertIntoChineseCapital(value));
  }, []);

  const handleReset = useCallback(() => {
    form.resetFields();
    setChineseCapitalOfMoney('')
  }, [form]);

  const handleGetFormValue = useCallback(() => {
    console.log(urlSearch.id);
    getFormValueItem({_id: urlSearch.id}).then((res: any) => {
      console.log(res.data[0]);
      form.setFieldsValue(res.data[0]);
    })
  }, [urlSearch, form]);

  const handleGetFormListById = useCallback(() => {
    getFormListById({
      parentId: formId,
    }).then((res) => {
      const result: any = res.data;
      setFormList([...result]);
      if(urlSearch && urlSearch.id) {
        handleGetFormValue();
      }
    })
  }, [formId, urlSearch, handleGetFormValue]);

  useEffect(() => {
    // console.log('formId', formId);
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
