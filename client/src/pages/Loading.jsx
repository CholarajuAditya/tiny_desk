function Loading() {
    return (
        <div
            className={
                "absolute inset-0 bg-[rgba(0,0,0,0.3)] flex items-center justify-center"
            }
        >
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-moneygreen border-white border-opacity-30 rounded-full animate-spin mb-4" />
                <p className="text-white text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
}

export default Loading;
