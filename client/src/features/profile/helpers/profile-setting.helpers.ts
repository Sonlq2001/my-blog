import * as Yup from 'yup';

import { MAX_NAME, MAX_DESCRIPTION } from '../constants/profile.constants';

const validateFile = Yup.mixed()
  .required('Vui lòng chọn ảnh')
  .test('avatar', 'Định dạng file ảnh không đúng', (value: File) => {
    return (
      value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
    );
  });

const maxValue = (maxLength: number) =>
  Yup.string().max(maxLength, `Số lượng vượt quá ${maxLength} ký tự`);

export const schema = Yup.object({
  avatar: validateFile,
  coverPhoto: validateFile,
  name: maxValue(MAX_NAME).required('Vui lòng nhập tên đại diện'),
  description: maxValue(MAX_DESCRIPTION).required(
    'Vui lòng nhập mô tả bản thân'
  ),
});

export const initSchema = {
  avatar: '',
  coverPhoto: '',
  name: '',
  description: '',
};