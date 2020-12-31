import React, { FC, useCallback } from 'react';
import { Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { addFormList } from '../api/formlist';

interface OperateButtonProps{
  formList: any;
}

const OperateButton: FC<OperateButtonProps> = (props) => {
  const { formList } = props;
  const hostory = useHistory();
  const { parentId } = useParams<{parentId: string;}>();

  const handleReview = useCallback(() => {
    sessionStorage.setItem('forms', JSON.stringify(formList));
    hostory.push('/form/review');
  }, [hostory, formList]);

  const handleSubmit = useCallback(() => {
    console.log('handleSubmit', formList);
    addFormList({
      parentId,
      forms: JSON.stringify(formList),
    }).then((res) => {
      console.log(res);
      hostory.push('/form/list');
    })
  }, [formList]);

  return (
    <div className="operate-button">
      <Button onClick={handleReview} style={{ margin: '10px'}}>预览</Button>
      <Button onClick={handleSubmit} style={{ margin: '10px'}} type="primary">提交</Button>
    </div>
  );
};
 
export default OperateButton;
  