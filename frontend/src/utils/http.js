

/**
 * Redirect
 * @param {String} url - url where should be redirected after be logged in
 * Ie. 'application/business'
 */
 const redirect = (url) => {
     this.props.history.push(url)
 };

 export{
    redirect
 }