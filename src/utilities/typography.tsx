import {clsx} from 'clsx';

interface ThemedTextProps{
    children: React.ReactNode
    tag?: 'div'|'p'|'span'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6'
    variant ?: 'heading-1'|'heading-2'|'heading-3'|'big-title'|'title'|'caption'|'big-btn'|'small-btn'|'small-text'
    color ?: 'primary'|'cyan'|'white'|'yellow'|'dark'|'red'|'gray'|'silver'
    weight? : 'bold'|'semibold'|'regular'
    className?:string
}
const ThemedText = ({className, children, tag:Tag='p', variant='small-text', color='dark', weight='semibold', }:ThemedTextProps)=>{

    let variantValue
    switch (variant) {
        case 'heading-1':
            variantValue = 'text-h1'
            break;
        case 'heading-2':
            variantValue = 'text-h2'
            break;
        case 'heading-3':
            variantValue = 'text-h3'
            break;
        case 'big-title':
            variantValue = 'text-big-title';
            break;
        case 'title':
            variantValue = 'text-title';
            break;
        case 'caption':
            variantValue = 'text-caption';
            break;
        case 'big-btn':
            variantValue = 'text-big-button';
            break;
        case 'small-btn':
            variantValue = 'text-small-button';
            break;
        case 'small-text':
            variantValue = 'text-small-text';
            break;
    }

    let colorValue
    switch (color) {
        case 'primary':
            colorValue = 'text-primary';
            break;
        case 'cyan':
            colorValue = 'text-cyan';
            break;
        case 'dark':
            colorValue = 'text-dark';
            break;
        case 'gray':
            colorValue = 'text-gray';
            break;
        case 'red':
            colorValue = 'text-red';
            break;
        case 'silver':
            colorValue = 'text-silver';
            break;
        case 'white':
            colorValue = 'text-white';
            break;
        case 'yellow':
            colorValue = 'text-yellow';
            break;
    }

    let fontValue
    switch (weight) {
        case 'bold':
            fontValue = 'font-bold';
            break;
        case 'regular':
            fontValue = 'font-light';
            break;
        case 'semibold':
            fontValue = 'font-italic';
            break;
    }


    return (
        <Tag className={clsx(variantValue, colorValue , fontValue ,className)}>
            {children}
        </Tag>
    )
}

export default ThemedText