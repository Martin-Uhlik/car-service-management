export interface ImgElementProps {
  svg: string;
}

export const ImgElement = ({ svg }: ImgElementProps) => {
  return (
    <svg className="icon" viewBox="0 0 24 24">
      <path fill="currentColor" d={svg} />
    </svg>
  );
}