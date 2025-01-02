import { SliderContent } from "../types/sliderContent";
import { $host } from "./index";

export const fetchSliderContent = async (): Promise<SliderContent> => {
  const { data } = await $host.get("api/sliderContent");
  return data;
};
export const addSliderContent = async (sliderContent: SliderContent) => {
  const { data } = await $host.post("api/sliderContent", sliderContent);
  return data;
};
export const deleteSliderContent = async (sliderContentId: number) => {
  const { data } = await $host.delete("api/sliderContent/" + sliderContentId);
  return data;
};
