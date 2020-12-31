import React, { FC, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { FormListParams } from '../view/CreateFormSetAttr';
import { getFormListById } from '../api/formlist';

interface DragTargetProps{
  formList: any;
  setFormList: (v: any) => void;
  setCurrentSelected: (v: any) => void;
}

const DragTarget: FC<DragTargetProps> = (props) => {
  const {formList, setFormList, setCurrentSelected} = props;
  const { parentId } = useParams<{parentId: string;}>();

  const handleDrop = useCallback((e) => {
    console.log('handleDrop--', e.target);
    e.preventDefault();
    const elementType: string = e.dataTransfer.getData('elementType');
    const element = {
      id: uuidv4(),
      type: elementType,
      name: '',
      label: elementType,
      placeHolder: 'Please do something...',
      isRequired: 0,
      isDisabled: 0,
      maxLength: 0,
    };
    setCurrentSelected(element);
    console.log('formList', formList);
    setFormList([
      ...formList,
      element,
    ])
  }, [formList, setFormList, setCurrentSelected]);

  const handleDragOver = useCallback((e) => {
    // console.log('handleDragOver--', e.target);
    e.preventDefault();
  }, []);

  const handleDelete = useCallback((list: FormListParams[], id: string) => {
    console.log('handleDelete', id);
    const newFormList = list.filter((item) => {
      return item.id !== id;
    });
    console.log('handleDelete', newFormList);
    setFormList([...newFormList]);
  }, [setFormList]);

  const handleClick = useCallback((item) => {
    console.log('handleClick', item);
    setCurrentSelected(item);
  }, [setCurrentSelected]);

  const handleGetFormListById = useCallback(() => {
    getFormListById({parentId}).then((res) => {
      const result: any = res.data;
      console.log('result', result);
      setFormList([...result]);
    });
  }, [parentId, setFormList]);

  useEffect(() => {
    handleGetFormListById();
  }, [handleGetFormListById]);

  return (
    <div
      className="drag-target"
      style={{ width: '400px', height: '800px', background: '#F5F5F5', padding: '20px', marginRight: '10px' }}
    >
      <h3 style={{ marginBottom: '10px', textAlign: 'center' }}>拖拽生成表单</h3>
      <div
        style={{
          height: '740px',
          background: '#DCDCDC',
          overflowY: 'hidden',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {
          formList.map((item: FormListParams) => (
            <div
              key={item.id}
              className="targetItem"
              style={{ 
                width: '100%',
                height: '40px',
                background: item.isDisabled ? '#f5f5f5' : '#FFFFFF',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                borderRadius: '5px',
                marginBottom: '10px',
                cursor: item.isDisabled ? 'not-allowed' : 'pointer',
              }}
              onClick={() => handleClick(item)}
            >
              <div
                className={item.isRequired ? 'label isRequired' : 'label'}
                style={{
                  width: '120px',
                  height: '40px',
                  borderRight: '1px solid #d9d9d9',
                  paddingRight: '2px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                {item.label}
              </div>
              <div
                className="placeHolder"
                style={{
                  width: '220px',
                  height: '40px',
                  color: '#d9d9d9',
                  paddingLeft: '2px',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                {item.placeHolder}
              </div>
              <div
                className="delete"
                style={{
                  width: '40px',
                  height: '40px',
                  background: '#ff4d4f',
                  textAlign: 'center',
                  lineHeight: '40px',
                  borderRadius: '5px',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '18px',
                }}
                onClick={() => handleDelete(formList, item.id)}
              >
                X
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
 
export default DragTarget;
  