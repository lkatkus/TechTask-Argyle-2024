interface DataModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}

export const DataModal = ({ data }: DataModalProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div>
        <h2 className="text-xl font-semibold">Data modal</h2>
      </div>

      <div className="p-4 bg-gray-200 overflow-x-auto">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};
