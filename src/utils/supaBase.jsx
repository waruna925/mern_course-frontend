import { createClient } from "@supabase/supabase-js"

const url=import.meta.env.VITE_SUPABASE_URL
const key=import.meta.env.VITE_SUPABASE_KEY

const supabase=createClient(url,key)

export default function mediaUpload(file){
    const mediaUploadPromise=new Promise(
        (resolve,reject)=>{
            if(file==null){
                reject("Please select a file")
                return
            }
            const timestamp=Date.now()
            const fileName=timestamp+file.name
            supabase.storage.from("images").upload(fileName,file,{
                upsert:false,
                cacheControl:"3600"
            }).then(
                ()=>{
                    const publicUrl=supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                    resolve(publicUrl)
                }
            ).catch((err)=>{
                console.log(err)
                reject(err)
            })
        }
    )

    return mediaUploadPromise
}