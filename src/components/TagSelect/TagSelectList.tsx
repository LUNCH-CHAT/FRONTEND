import ExchangeIcon from '@/assets/icons/exchangestudent.svg?react';
import CareerIcon from '@/assets/icons/career.svg?react';
import ExamIcon from '@/assets/icons/exampreparation.svg?react';
import StartupIcon from '@/assets/icons/startups.svg?react';
import GradeIcon from '@/assets/icons/graditmanagement.svg?react';
import LanguageIcon from '@/assets/icons/forienlanguage.svg?react';
import HobbyIcon from '@/assets/icons/extreaactivities.svg?react';
import SchoolIcon from '@/assets/icons/campus.svg?react';
import { useState } from 'react';
import TagSelectCard from './TagSelectCard';

export default function TagSelectList() {
    const tags=[
        {text:"교환학생", icon:<ExchangeIcon className='size-full'/>},
        {text:"취업/진로", icon:<CareerIcon className='size-full'/>},
        {text:"고시준비", icon:<ExamIcon className='size-full'/>},
        {text:"창업", icon:<StartupIcon className='size-full'/>},
        {text:"학점관리", icon:<GradeIcon className='size-full'/>},
        {text:"외국어 공부", icon:<LanguageIcon className='size-full'/>},
        {text:"취미/여가", icon:<HobbyIcon className='size-full'/>},
        {text:"학교생활", icon:<SchoolIcon className='size-full'/>},
    ]

    const MAX_SELECT=3;

    const [selectTags,setSelectTags]=useState<string[]>([]);

    const onClickTag=(text:string)=>{
        if (selectTags.includes(text)){
            setSelectTags(selectTags.filter(tag=>tag!=text));
        }else{
            if(selectTags.length< MAX_SELECT){
                setSelectTags([...selectTags,text]);
            }
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
        <div className="w-full grid grid-cols-3 gap-[22px]">
            
            {tags.map(tag=>(
                <div className='flex justify-center items-center'>
                <TagSelectCard
                    title={tag.text}
                    icon={tag.icon}
                    select={selectTags.includes(tag.text)}
                    onClick={()=>onClickTag(tag.text)}/>
                </div>
            ))}
            
        </div>
        </div>
    );
}