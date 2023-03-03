export default function Die(props) {
    const styles = {
        backgroundColor: (function(){
            if(props.isHeld){
                if(props.heldIsEqual) {
                    return "#59E391"
                } else {
                    return "#E9B44C"
                }
            } else {
                return "#fff"
            }
        }())
        
        
        // props.isHeld ? "#59E391" : "#fff"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}