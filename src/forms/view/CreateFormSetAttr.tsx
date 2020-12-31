import React, { FC, useCallback, useState } from 'react';
import _ from 'lodash';
import './CreateFormSetAttr.scss';
import DragSource from '../component/DragSource';
import DragTarget from '../component/DragTarget';
import SetAttr from '../component/SetAttr';
import OperateButton from '../component/OperateButton';

export interface FormListParams{
  id: string;
  type: string;
  name: string;
  label: string;
  placeHolder?: string;
  isRequired?: number;
  message?: string;
  isDisabled?: number;
  maxLength: number;
}

const CreateFormSetAttr: FC<{}> = () => {
  /**
   * 生成表单元素
   * id: 控件id
   * type: 控件类型
   * label: 控件label
   * placeHolder: 控件placeHolder
   * isRequired: 设置控件是否必填
   * isDisabled: 设置控件是否禁用
   * 
  */
  const [formList, setFormList] = useState<FormListParams[]>([]);
  const [currentSelected, setCurrentSelected] = useState<any>();

  const handleGetIndexById = useCallback((id): number => {
    return formList.findIndex((item: any) => item.id === id);
  }, [formList]);

  const handleUpdateFormListAttr = useCallback((name, value) => {
    const newFormList: any = _.cloneDeep(formList);
    const index = handleGetIndexById(currentSelected.id);
    newFormList[index][name] = value;
    setFormList([...newFormList]);
  }, [formList, currentSelected, handleGetIndexById]);

  return (
    <div 
      className="create-form-set-attr" 
      style={{ padding: '20px', display: 'flex', justifyContent: 'center'}}
    >
      <DragSource />
      <DragTarget 
        formList={formList}
        setFormList={setFormList}
        setCurrentSelected={setCurrentSelected}
      />
      <SetAttr
        currentSelected={currentSelected}
        handleUpdateFormListAttr={handleUpdateFormListAttr}
      />
      <OperateButton formList={formList}/>
    </div>
  );
};
 
export default CreateFormSetAttr;
  