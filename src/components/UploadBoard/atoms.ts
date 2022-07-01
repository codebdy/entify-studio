import { atom } from "recoil";

const gql = `
  mutation upload($file:Upload!){
    upsertOneEntityName(
      object:{
        file:$file, 
        name:"file name"
      }
    ){
      id
      file{
        url
      }
    }
  }
`

export const uploadGqlState = atom<string>({
  key: "uploadGql",
  default: gql,
});
