import React from 'react';
import './photo-info.scss'
import {server} from '../../../server/server';
import {Link} from 'react-router-dom';
import Loader from '../../components/loader/loader';
import {connect} from 'react-redux';
import {getPhotoIdPage} from '../../../redux/actions/actions';

class PhotoInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            photo: this.props.photo,
        }
    }

    idNumber = () => {
        const href = (window.location.href).split('/');
        const id = href[href.length - 1]
        return id
    }

    componentDidMount() {
        const id = this.idNumber()
        this.props.getPhotoIdPage(id)
    }

    componentWillReceiveProps(next){
        this.setState({
            photo: next.photo
        })

        return true
    }

    render() {
        return (
            <>
                {this.state.loader && <Loader top={document.documentElement.scrollTop}/>}
                <div className={'photo-parameters photo-parameters_style'}>
                    <div className={'photo-parameters__wrapper photo-parameters__wrapper_style'}>
                        <div className={'photo-parameters__img-container photo-parameters__img-container_style'}>
                            {
                                this.state.photo === null && ! this.state.loader ? <div className={'photo-parameters__null photo-parameters__null-style'}>Нет изображения</div> :
                                    <img className={'photo-parameters__img photo-parameters__img_style'} src={server + '/images/' + this.idNumber() + '.jpg'}/>
                            }
                            <div className={'photo-parameters__button_style'}>
                                <Link to='/gallery'><h1>Назад</h1></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }



}

const mapStateToProps = props => {
    return {
        photo: props.photos.photo,
        loader: props.system.loading,
    }
}

const mapDispatchToProps = {
    getPhotoIdPage
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoInfo)