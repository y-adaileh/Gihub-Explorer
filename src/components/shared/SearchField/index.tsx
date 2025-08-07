export interface SearchFieldProps {
  placeholder: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchField = (props: SearchFieldProps) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};
