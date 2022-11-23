const ALPHABET : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function alphabet_code(size : number):string{
    let code : string = '';
    for(let i = 0; i<size; i++){
        code = code + ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length))
    }
    return code;
}