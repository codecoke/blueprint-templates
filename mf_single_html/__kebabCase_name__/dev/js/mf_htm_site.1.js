const _app_cof = { 
  'dir':{
    'data':'./data'
  },
  'data':[],
  'data_names_arr':[],

  //global_element
  'gl_el':{ 
    'meta_project_name':'mf_html',
  },

  'powered_info':{
    'name':'single page website by mf',
    'authors':['mf(at)136.me'],
  },
  'version':'0.1'
}

async function _fetch(url) {      
  let res = await fetch(url)
    .then(v => {
      if (v.status == 200) {
        /* 
          todo:res.type        
        */
        return v.json();            
      }else{
        throw new Error(
          `${v.status}
          ${v.statusText} 
          content-type: ${v.headers.get('Content-Type')}
          Date: ${v.headers.get('Date').toLocaleString()} ${/*  注释 */''}
          url: ${v.url}`
        )
      }
    })
    .catch(e=>{
      throw e;
    })
  ;
  return res;
}

const _el_attr = function(_sel,_attr_name){
  let _el = document.querySelector(_sel);
  if (_el !== null) {
    return _el.getAttribute(_attr_name);
  }
  return null;
}

const _load_site_info = async function(_cof){
  try{
    if (typeof _cof==='undefined') {
      throw new Error('load_site_info params\[_cof\] must object')
    } 
    // let _powered = _cof.gl_el.powered
    //     ,_project_id = _powered.id
    //     ,_powered_el = document.getElementById(_project_id)
    //     ,_meta_name = _el_attr(`meta[name='${_cof.gl_el.meta_project_name}']`,'content')
    // ;
    let _meta_content = _el_attr(`meta[name='${_cof.gl_el.meta_project_name}']`,'content')
    
    if (_meta_content == null) {
      throw new Error(
        '\<meta name=\"' + _cof.gl_el.meta_project_name + '\"\> is null'
      )
    }
    _meta_content = _meta_content.split(', ');

    let _meta_name = _meta_content[0];    
    
    if (_cof.data_names_arr.includes(_meta_name) ) {
      throw new Error(_meta_name + ' has loaded')      
    }
    _cof.gl_el.mata_content_arr = _meta_content
    _cof.data_names_arr.push(_meta_name)
    
    let _res_data = await _fetch(_cof.dir.data+'/' + _meta_name +'.1.json');
    if (_res_data instanceof Error) throw _res_data;          
    _cof.data.push(..._res_data)
    
    let _powered = document.querySelector('footer > small') || document.createElement('small');
    let _powered_txt = `${_cof.gl_el.meta_project_name} v.${_cof.version}`;
    
    // _powered.appendChild(document.createTextNode(_powered_txt))
    _powered.append(_powered_txt)
    // _powered.classList.add('text-capitalize')
    _powered.setAttribute('powered-by',_cof.powered_info.name)     
    document.querySelector('footer').appendChild(_powered)

  }catch(e){throw e; }

}

async function _load_page(_page='home',_cof = _app_cof){
  try {
    await _load_site_info(_cof);
    console.log(_cof);
    
  } catch (e) {throw e;}
}

export {
  _load_page as default,
  _app_cof,
  _fetch,
  _el_attr,  
}