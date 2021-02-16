/*
includes tool funtions
*/

/*
after AUTH_SUCCESS:

need to fill info
boss: /bossinfo
coder: /coder

not need
boss: /boss
coder: /coder

judge need or not? user.avatar
judge type: user.type
*/
/*
return corresponding route
*/

export function getRedirectTo(type, avatar) {
    let path = ''
    //type
    if(type === 'boss'){
        path = '/boss'
    } else {
        path = '/coder'
    }
    if(!avatar) {
        path += 'info'
    }
    return path
}