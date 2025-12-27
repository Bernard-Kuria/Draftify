export default function ProgressDonut({ progress = null }) {
  const angle = progress !== null ? (progress / 100) * 360 : 0;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        className="grid justify-center items-center w-32 h-32 rounded-full"
        // Use a template literal to insert the dynamic angle value
        style={{
          background: `conic-gradient(rgb(59, 130, 246) ${angle}deg, transparent 0)`,
        }}
      >
        <div className="w-30 h-30 bg-white rounded-full text-center text-(--draftify-theme-color) grid items-center ">
          <div>
            <div className="italic text-[13px]">progress</div>
            <div className="text-xl font-bold">
              {progress !== null && `${progress}%`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
