import { getSchool } from "./methods.js";

const createFilter = function (school) {
    const selectSchool = document.getElementById('selectSchool')
    selectSchool.classList.add('teste1')
    const schoolId = document.createElement('option')
    schoolId.classList.add('teste1')

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
