'use strict'

export const getSchool = async () => {
    const url = 'http://localhost:8080/v1/cultural-path/escola'
    const response = await fetch(url)
    const school = await response.json()
    const schools = school.dadosEscolas
    return schools;
}