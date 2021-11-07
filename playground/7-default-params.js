const greeter = ( name = "Papo") =>{

    console.log(`Hola ${name}`);
}
greeter("Lenin")
greeter()
const transaccion = (type, {label , stock }={} ) => {
    console.log(type,label,stock);
}
transaccion("order",{label:"Gran", stock: "manubrio"})