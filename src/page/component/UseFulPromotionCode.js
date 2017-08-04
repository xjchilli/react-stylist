/**
 * 可用的优惠卷
 */
import React, {
    Component
} from 'react';

class UseFulPromotionCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            couponsId: props.couponsId
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            couponsId: nextProps.couponsId
        });
    }


    render() {
        let {
            data
        } = this.props;


        return (
            <section className="pay-select-promotion">
                <div className="full-page"> 
                    <ul className="promotion-list-area">
                        {
                            data.map((item,index)=>{
                                let isSelected=this.state.couponsId == item.id ? 'active' : null;
                                return (
                                        <li className={isSelected}  key={index} onClick={this.props.selectPromotion.bind(this,item.id,item.price)}>
                                            <h5>{item.name}</h5>  
                                            <p className="time">有效期至{item.expiryDate}</p>    
                                            <p className="tips">{item.source}</p>
                                            <div className="price-area">
                                                <small>￥</small>
                                                {item.price}
                                            </div>  
                                            <svg viewBox="0 0 142 108" className="icon-svg-promotion-code">
                                                <use xlinkHref="/assets/img/icon.svg#svg-tick"/>
                                            </svg>
                                        </li>
                                        )
                            })
                        }
                    </ul>
                </div> 

                <section className="action-area">
                    <button className="btn" onClick={this.props.giveUpPromotion.bind(this)}>&#8592;&nbsp;不使用优惠券</button>
                </section>
            </section>
        )
    }
}

export default UseFulPromotionCode;