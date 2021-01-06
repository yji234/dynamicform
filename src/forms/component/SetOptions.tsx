import React, { useCallback, useState, useImperativeHandle } from 'react';
import { Input, Tag } from 'antd';
import _ from 'lodash';
import './SetOptions.scss';

interface SetOptionsProps {
  isDisabled: any;
  onChange: (v: any) => void;
  setOptionsRef: any;
}

const SetOptions: React.FC<SetOptionsProps> = (props) => {
  const { isDisabled, onChange, setOptionsRef } = props;
  const [list, setList] = useState<any>([]);
  const [order, setOrder] = useState<number>(1);
  const [value, setValue] = useState<any>();

  const handleClose = useCallback((order, color) => {
    const newList = list.filter((item: any) => item.order !== order);
    setList([...newList]);
  }, [list]);

  const handlePressEnter = useCallback((e) => {
    const setLabel: string = e.target.value;
    const newList: any = _.cloneDeep(list);
    if (setLabel) {
      const tag = {
        text: setLabel,
        order: order,
      };
      newList.push(tag);
      setList([...newList]);
      setOrder(order + 1);
    }
    setValue('');
    onChange(newList);
  }, [order, list, onChange]);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  useImperativeHandle(setOptionsRef, (): any => ({
    handleSetList: (list: any) => {
      setList([...list]);
      setOrder(list.length + 1);
    },
  }));

  return (
    <div className="set-options">
      <div className="tag-list">
        {
          list && list.length > 0 && list.map((item: any) => (
            <Tag
              key={item.order}
              closable
              onClose={() => handleClose(item.order, item.color)}
              className="tag"
            >
              <div className="icon" style={{ backgroundColor: item.color }}> </div>
              {item.text}
            </Tag>
          ))
        }
      </div>
      <Input
        placeholder="请输入选项，按enter键隔开"
        bordered={false}
        style={{ minWidth: '280px' }}
        onPressEnter={handlePressEnter}
        maxLength={10}
        disabled={isDisabled}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SetOptions;
