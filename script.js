const add_btn = document.getElementById('add_nt');

const local_str = () => {
    const t_area_d = document.querySelectorAll('.t_area');
    const notes = [];
    
    // console.log(t_area_d);
    t_area_d.forEach((note)=>{
        return notes.push(note.value);
    })
    // console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlNote = `
    <div class="options">
        <button class="edit"><i class="far fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class = "m_div ${text ? "": "hidden"}"></div>
    <textarea class="t_area ${text ? "hidden": ""}" placeholder="Add a note here....."></textarea>
    `;

    note.insertAdjacentHTML('afterbegin',htmlNote);
    // console.log(note);

    const edit_nt = note.querySelector('.edit');
    const delete_nt = note.querySelector('.delete');
    const m_div = note.querySelector('.m_div');
    const t_area = note.querySelector('.t_area');

    delete_nt.addEventListener('click', () => {
        note.remove();
        local_str();
    })

    t_area.value=text;
    m_div.innerHTML = text;

    edit_nt.addEventListener('click', ()=>{
        m_div.classList.toggle('hidden');
        t_area.classList.toggle('hidden');
    })

    t_area.addEventListener('change',(event_n)=>{
        const value = event_n.target.value;
        m_div.innerHTML = value;

        local_str();
    })

    document.body.appendChild(note);
}

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){notes.forEach((note)=> addNewNote(note))}


add_btn.addEventListener('click', () => addNewNote());