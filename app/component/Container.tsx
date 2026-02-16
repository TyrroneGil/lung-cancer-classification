
type ContainerProps ={
    children: React.ReactNode,

}

const Container:React.FC<ContainerProps> = ({
    children,

}) =>{
    return(
        <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 w-lvw h-lvh flex flex-col">
            {children}
        </div>
    );
}


export default Container;