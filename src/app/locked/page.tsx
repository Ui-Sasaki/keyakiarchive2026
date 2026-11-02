/**
 *
 * /locked
 */
const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-xl">
        <p className="mb-6 text-red-600 font-bold">
          あなたのアカウントはロックされています。
        </p>
        <p>けやき祭運営にお問い合わせください。</p>
      </div>
    </div>
  );
};

export default Page;
