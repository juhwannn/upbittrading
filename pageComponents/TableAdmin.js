import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const Root = styled.div`
    table.admin {
        &.w100 {
            width: 100%;        
        }
        border-collapse: collapse;
        
        >thead, >tbody {
            >tr {
                >th, > td {
                    padding: 8px 10px;
                }
            }
        }
        > thead {
            border-top: 3px solid #000;
            border-bottom: 3px solid #000;
            >tr {
                > th {
                    padding-top: 15px;
                    padding-bottom: 15px;
                    position: relative;
                }
                >th+th:before {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    left: 0;
                    top: 13px;
                    bottom: 13px;
                    width: 1px;
                    background-color: #000;                
                }
            }
        }
        > tbody {
            border-top: 3px solid #000;
            border-bottom: 3px solid #000;
            >tr {
                cursor: pointer;
                &:hover {
                    background-color: #DDE9F5;
                }
                th, td {
                    text-align: center;
                    border-bottom: 1px solid #000;
                    max-width: 200px;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                > th {
                }
                > td {
                }
                >th+td {
                    text-align: left;
                }
            }
        }
    }
`;

const fieldMap = {
    seq: '#',
    dateCreated: '생성일',
    dateModified: '수정일',
    id: '아이디',
    name: '이름',
    role: '권한',
    isCorporation: '법인',
    companyName: '법인명',
    dateEmailVerified: '메일인증일',
    mobile: '휴대폰',
    email: '이메일',
    agreeEula: '약관동의',
    agreePrivacy: '개인정보동의',
    agreeAd: '광고동의',
    agreeNewsletter: '뉴스레터동의',
    industry: '업종',
    domain: '도메인',
    referer: '가입경로',
    recommender: '추천인',
    businessRegistrationNumber: '사업자등록번호',
    state: '상태',
    vmid: 'VMID',
    dateStarted: '시작일',
    serviceName: '서비스명',
    user: '사용자',
    service: '서비스',
    priority: '우선순위',
    price: '금액',
    cpu: 'CPU',
    rootVolume: 'Root Volume',
    network: 'Network',
    memory: 'Memory',
    description: '설명',
    userName: '사용자명',
    vmName: 'VM Name'
};
const fieldConverter = f => fieldMap[f] ?? f;

const valueConverter = (v, f) => {
    const type = typeof v;
    switch (type) {
        case 'boolean':
            return v ? '✓' : '';
        case 'number':
            return v.toLocaleString();
    }

    if (f.startsWith('date')) {
        const day = dayjs(v);
        if (day.isValid())
            return <span title={day.toISOString()}>{day.format('YYYY-MM-DD')}</span>;
    }

    if (f === 'vm') {
        return <button>보기</button>;
    }

    return v;
};

export const TableAdminArray = (
    {
        value,
        onClickTbodyTr = (v, indexRow, array) => e => console.log(v, indexRow, array, e),
        onRenderAdditionalHead = array => null,
        onRenderAdditionalBody = (row, i, array) => null,
    }
) => {
    const arrayField = [...new Set(value.flatMap(Object.keys))];
    if (!arrayField.length)
        return null;

    return (
        <Root>
            <table className="admin w100">
                <thead>
                <tr>
                    {arrayField.map((v, i) => (
                        <th key={i}>{fieldConverter(v)}</th>
                    ))}
                    {onRenderAdditionalHead(value)}
                </tr>
                </thead>
                <tbody>
                {value.map((v, indexRow) => (
                    <tr key={indexRow} onClick={onClickTbodyTr(v, indexRow, value)}>
                        {arrayField.map((f, indexColumn) => (
                            <td key={indexColumn}>{valueConverter(v[f], f)}</td>
                        ))}
                        {onRenderAdditionalBody(v, indexRow, value)}
                    </tr>
                ))}
                </tbody>
            </table>
        </Root>
    );
};

export const TableAdminObject = ({
                                     value,
                                     onClick = v => e => console.log(v, e),
                                 }) => {
    const arrayField = Object.keys(value);

    return (
        <Root>
            <table className="admin" onClick={onClick(value)}>
                <tbody>
                {arrayField.map((f, i) => (
                    <tr key={i}>
                        <th>{fieldConverter(f)}</th>
                        <td>{valueConverter(value[f], f)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Root>
    );
};


