import { getSchool } from "./methods.js";


const createFilter = function (school) {
    const selectSchool = document.getElementById('selectSchool')
    selectSchool.classList.add('text-input')
    const schoolId = document.createElement('option')
    schoolId.classList.add('text-input')

    schoolId.textContent = `${school[1]} - ${school[0]}`
    selectSchool.append(schoolId)
    return selectSchool
};

export const getSelected = async function () {
    const schools = await getSchool()
    const mapingSchool = schools.map(i => {
        return [
            i.escola.id,
            i.escola.nome
        ]
    })

    const select = document.getElementById('school')
    const onlySchool = mapingSchool.map(createFilter)

    select.replaceChildren(...onlySchool)
}

const createFilterModal = function (school) {
    const selectSchool = document.getElementById('modalSelectedSchool')
    selectSchool.classList.add('modal-field')
    const schoolId = document.createElement('option')
    schoolId.classList.add('modal-field')

    schoolId.textContent = `${school[1]} - ${school[0]}`
    selectSchool.append(schoolId)
    return selectSchool
};

export const getSelectedModal = async function () {
    const schools = await getSchool()
    const mapingSchool = schools.map(i => {
        return [
            i.escola.id,
            i.escola.nome
        ]
    })

    const select = document.getElementById('schoolModal')
    const onlySchool = mapingSchool.map(createFilterModal)

    select.replaceChildren(...onlySchool)
}
