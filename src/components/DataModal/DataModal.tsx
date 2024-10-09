interface DataModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}

export const DataModal = ({ data }: DataModalProps) => {
  return (
    <div className="p-4 bg-gray-200 overflow-x-auto">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
