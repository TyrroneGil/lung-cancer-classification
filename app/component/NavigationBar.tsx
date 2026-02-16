
type NavigationBarProps = {
    children:React.ReactNode;
    className:string
}

const NavigationBar:React.FC<NavigationBarProps> = ({
    children,
    className=""
})=>{
    return(
        <div className={className}>

            {children}
        </div>
        

    );
}

export default NavigationBar;