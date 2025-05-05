export type FileRes = string | ArrayBuffer | null;

export const getFileSrcData = (
  file: File,
  onFinish?: (res: FileRes) => any
): FileRes => {
  let res: FileRes = null;

  if (FileReader && file) {
    const fr = new FileReader();
    fr.onload = function () {
      onFinish && onFinish(fr.result);
      res = fr.result;
    };
    fr.onprogress = (e) => {
      console.log(e);
    };
    fr.readAsDataURL(file);
  }
  return res;
};
