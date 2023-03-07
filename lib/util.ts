export const getElapsedTimeInSeconds = (startMs:number) => {
    +((Date.now() - startMs) / 1000.0).toFixed(2);
}

export default getElapsedTimeInSeconds;