import React, { FC, useCallback } from 'react';
import { Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { addFormList, modifyFormList } from '../api/formattr';

interface OperateButtonProps{
  formList: any;
}

const OperateButton: FC<OperateButtonProps> = (props) => {
  const { formList } = props;
  const history = useHistory();
  const { parentId, operateType } = useParams<{parentId: string; operateType: string;}>();

  const handleAdd = useCallback(() => {
    addFormList({
      parentId,
      forms: JSON.stringify(formList),
    }).then((res) => {
      console.log(res);
      history.push('/form/list');
    })
  }, [formList, history, parentId]);

  const handleModify = useCallback(() => {
    modifyFormList({
      parentId,
      forms: JSON.stringify(formList),
    }).then((res) => {
      console.log(res);
      history.push('/form/list');
    })
  }, [formList, history, parentId]);

  const handleSubmit = useCallback(() => {
    // console.log('formList', formList);
    if(operateType === 'add') {
      handleAdd();
    } 
    if(operateType === 'modify') {
      handleModify();
    }
  }, [operateType, handleAdd, handleModify]);

  return (
    <div className="operate-button">
      <Button onClick={handleSubmit} style={{ margin: '10px'}} type="primary">提交</Button>
    </div>
  );
};
 
export default OperateButton;
  