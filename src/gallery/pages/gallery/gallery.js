import React from 'react'
import './gallery.scss'
import Photo from '../../components/photo/photo';
import {
    getGallery,
    putJsonPhoto,
    getGalleryScroll,
    getCountPhotos,
    getPhotoId,
    putUrlPhoto,
    deletePhoto
} from '../../../redux/actions/actions';
import {sizeColumn} from './functions/functions';
import InputSelector from '../../components/input-selector/input-selector';
import Loader from '../../components/loader/loader';
import Error from '../../components/error/error';
import Input from '../../components/input/input';
import {connect} from 'react-redux';

class Gallery extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            photos: this.props.photos,
            countPhotos: this.props.countPhotos,
            loader: true,
            error: false,
            errorText: '',
        }}

    componentWillReceiveProps(next){
        this.setState({
            photos: next.photos,
            countPhotos: next.countPhotos,
            loader: next.loader,
            error: next.error,
            errorText: next.errorText
        })
    }

    obj = {
        arrayInput: [
            {
                data_name: 'JSON',
                type: 'file',
                accept_file: '.json',
            },
            {
                data_name: 'URL',
                type: 'text',
                placeholder: 'URL Image',
                function_submit: (event) => {this.props.putUrlPhoto(event)}
                }],
        ojbButtonSubmit: [{
            button_icon: 'icon-upload',
            data_name: 'JSON',
            function_submit: (event) => {this.props.putJsonPhoto(event)}
        }],
        arrOption: ['URL', 'JSON']
    }

    size = () => {
        sizeColumn(this.state.photos, window.outerWidth, '.photo')
    }

    componentDidMount() {
        if (this.state.photos.length === 0) {
            this.props.getGallery(50)
            this.props.getCountPhotos()
        }
        this.size()
        window.addEventListener('resize', this.size);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.size);
    }

    componentDidUpdate() {
        if (this.state.photos.length > 1) {
            sizeColumn(this.state.photos, window.outerWidth, '.photo');
        }
        //window.addEventListener('resize', (event) => {sizeColumn(this.state.photos, window.outerWidth, '.photo')})
    }


    shouldComponentUpdate() {
        /*Скроллинг и подгрузка изображений*/
        window.onscroll =  () => {
            if (this.state.photos && this.state.photos.length !== 1) {
                const scrollLab = document.documentElement.scrollHeight - window.innerHeight
                if(Math.ceil(scrollLab) === Math.ceil(window.scrollY)) {
                    this.props.getGalleryScroll(this.state.photos.length + 50)
                }
            }
        }

        return true
    }


    render() {
        return(
            <>
                {this.state.photos.length > 1 ? sizeColumn(this.state.photos, window.outerWidth, '.photo') : null}
                <div className={'gallery-input-area gallery-input-area_style'}>
                    <div className={'gallery-input-area__wrapper gallery-input-area__wrapper_style'}>
                        <Input state={{placeholder: 'Search ID', type: 'number', keyUpFunction: (event) => this.props.getPhotoId(event)}}/>
                        <InputSelector objSelectorInput={this.obj}/>
                        {this.state.error && <Error text={this.state.errorText}/>}
                    </div>
                </div>
                {this.state.loader && <Loader top={document.documentElement.scrollTop}/>}
                <div className={'gallery gallery_style'}>
                    <div className={'gallery__wrapper gallery__wrapper_style'}>
                        <div className={'gallery__list gallery__list_style'}>
                            {this.state.photos.length === 0  && !this.state.loader ?
                                <div className={'gallery__list-null gallery__list-null_style'}><div>Нет изображений</div></div> :
                                <div className={'gallery__list gallery__list_style'}>
                                    {this.state.photos.map(photo => <Photo
                                        photo={{photo: photo, delete: (event) => this.props.deletePhoto(event)}}
                                        key={photo.id}/>)}
                                </div>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = props => {
    return {
        photos: props.photos.photos,
        countPhotos: props.photos.countPhotos,
        loader: props.system.loading,
        error: props.system.error,
        errorText: props.system.errorText
    }
}

const mapDispatchToProps = {
    getGallery,
    getGalleryScroll,
    getCountPhotos,
    getPhotoId,
    deletePhoto,
    putUrlPhoto,
    putJsonPhoto
}
export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
