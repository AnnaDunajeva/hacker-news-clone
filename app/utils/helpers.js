const convertTime = (unixTime) => {
    const time = new Date(unixTime * 1000) //unix time is in seconds, js time in miliseconds, so we have to convert unix time
    // const day = time.getDate();
    // const month = time.getMonth() + 1;
    // const year = time.getFullYear();
    // const hour = time.getHours();
    // const minutes = time.getMinutes();
    // return `${day}/${month}/${year} ${hour}:${minutes}`
    return time.toLocaleDateString("en-GB", {
        hour: '2-digit' ,
        minute: '2-digit'
      })
}

export {convertTime};