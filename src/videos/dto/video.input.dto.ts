import { Resolution } from '../types/video';

export type VideoInputDto = {
  // id: number;
  title: string;
  author: string;
  availableResolutions: Resolution[];
};
