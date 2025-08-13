import ExchangeIcon from '@/assets/icons/exchangestudent.svg?react';
import CareerIcon from '@/assets/icons/career.svg?react';
import ExamIcon from '@/assets/icons/exampreparation.svg?react';
import StartupIcon from '@/assets/icons/startups.svg?react';
import GradeIcon from '@/assets/icons/graditmanagement.svg?react';
import LanguageIcon from '@/assets/icons/forienlanguage.svg?react';
import HobbyIcon from '@/assets/icons/extreaactivities.svg?react';
import SchoolIcon from '@/assets/icons/campus.svg?react';
import TagSelectCard from './TagSelectCard';

interface TagSelectListProps {
  selected: string[];
  onChange: (updated: string[]) => void;
}

export default function TagSelectList({selected, onChange}: TagSelectListProps) {
    const tags=[
        {id:"EXCHANGE_STUDENT", text:"교환학생", icon:<ExchangeIcon className='size-full'/>},
        {id:"EMPLOYMENT_CAREER", text:"취업/진로", icon:<CareerIcon className='size-full'/>},
        {id:"EXAM_PREPARATION", text:"고시준비", icon:<ExamIcon className='size-full'/>},
        {id:"STARTUP", text:"창업", icon:<StartupIcon className='size-full'/>},
        {id:"GPA_MANAGEMENT", text:"학점관리", icon:<GradeIcon className='size-full'/>},
        {id:"FOREIGN_LANGUAGE_STUDY", text:"외국어 공부", icon:<LanguageIcon className='size-full'/>},
        {id:"HOBBY_LEISURE", text:"취미/여가", icon:<HobbyIcon className='size-full'/>},
        {id:"SCHOOL_LIFE", text:"학교생활", icon:<SchoolIcon className='size-full'/>},
    ]

    const MAX_SELECT=3;

    const onClickTag=(id:string)=>{
        if (selected.includes(id)){
            onChange(selected.filter(tag=>tag!=id));
        }else{
            if(selected.length< MAX_SELECT){
                onChange([...selected,id]);
            }
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full grid grid-cols-3 gap-[22px]">
                {tags.map(tag=>(
                    <div key={tag.id} className='flex justify-center items-center'>
                    <TagSelectCard
                        title={tag.text}
                        icon={tag.icon}
                        select={selected.includes(tag.id)}
                        onClick={()=>onClickTag(tag.id)}/>
                    </div>
                ))}
                
            </div>
        </div>
    );
}