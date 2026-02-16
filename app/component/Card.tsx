type CardProps = {
    children:React.ReactNode,
    className:string
}

const Card:React.FC<CardProps>=({
    children,
    className
})=>{
    return(
        <div className={`w-[90%]  border rounded-[15px]  ${className}`}>
            {children}
        </div>
    );
}

export default Card;