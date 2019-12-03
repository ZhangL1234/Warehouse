import image from "../components/hos/content/image";
import list from "../components/hos/content/list";
import Answer from '@/views/main_content/answer'
import Evaluate from '@/views/main_content/evaluate'
import ReviewResults from '@/views/main_content/review_results'
import MainEvalRecord from '@/views/main_content/eval_record'

export default [
    {
        path: '',
        component: list
    },
    {
        path: 'image',
        component: image
    },
    {
        path: 'list',
        component: list
    },
    {
        path: 'answer',
        component: Answer
    },
    {
        path: 'evaluate',
        component: Evaluate
    },
    {
        path: 'review_results',
        component: ReviewResults
    },
    {
        path: 'eval_record',
        component: MainEvalRecord
    }
]