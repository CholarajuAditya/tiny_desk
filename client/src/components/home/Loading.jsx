function Loading() {
    return (
        <div className={"absolute inset-0 flex items-center justify-center"}>
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-t-moneygreen border-black border-opacity-30 rounded-full animate-spin mb-4" />
                <p className="text-black text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
}

export default Loading;
