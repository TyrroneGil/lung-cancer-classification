
type ContainerProps ={
    children: React.ReactNode,

}

const Container:React.FC<ContainerProps> = ({
    children,

}) =>{
    return(
        <div className="  w-lvw h-lvh flex flex-col  overflow-y-scroll no-scrollbar scroll-smooth">
            {children}
        </div>
    );
}


export default Container;