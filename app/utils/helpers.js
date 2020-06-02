const convertTime = (unixTime) => {
    const time = new Date(unixTime * 1000) //unix time is in seconds, js time in miliseconds, so we have to convert unix time

    return time.toLocaleDateString("en-GB", {
        hour: '2-digit' ,
        minute: '2-digit'
      })
}

export {convertTime};