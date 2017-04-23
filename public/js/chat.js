const crypto = require('crypto');
const http = require('./http');
const getHash = (pass, salt) => crypto.pbkdf2Sync(pass, salt, 10000, 32, 'sha256').toString('hex');

const defaultPath = '/api/v1';
const userPath = `${defaultPath}/users`;
const connectPath = `${defaultPath}/connections`;

$(function () {
    const socket = io()

    $('form').submit(_ => {
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    // 회원가입
    $('#sineUpBtn').click(_ => {
        const id = $('#upId').val();
        const userName = $('#upName').val();
        const pass = $('#upPass').val();

        http.post(userPath, {userId: id})
            .then(result => {
                const hashToken = getHash(pass, result.data.salt);
                return http.post(`${userPath}/${id}`, {
                    hashToken, userName
                })
            })
            .then(_ => {
               alert('회원가입이 완료되었습니다.');
                location.reload();
            });
    });

    // 로그인
    $('#sineInBtn').click(_ => {
        const userId = $('#inId').val();
        const pass = $('#inPass').val();

        http.get(`${connectPath}/salt`, {userId})
            .then(result => {
                const hashToken = getHash(pass, result.data.salt);
                return http.post(connectPath, {
                    userId, hashToken
                })
            })
            .then(result => {
                localStorage.setItem('accessToken', result.data.accessToken);
            })
    });

    socket.on('chat message', msg => {
        $('#messages').append($('<li>').text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    });

    $('.form').find('input, textarea').on('keyup blur focus', function (e) {

        var $this = $(this),
            label = $this.prev('label');

        if (e.type === 'keyup') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.addClass('active highlight');
            }
        } else if (e.type === 'blur') {
            if ($this.val() === '') {
                label.removeClass('active highlight');
            } else {
                label.removeClass('highlight');
            }
        } else if (e.type === 'focus') {

            if ($this.val() === '') {
                label.removeClass('highlight');
            }
            else if ($this.val() !== '') {
                label.addClass('highlight');
            }
        }

    });

    $('.tab a').on('click', function (e) {

        e.preventDefault();

        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');

        target = $(this).attr('href');

        $('.tab-content > div').not(target).hide();

        $(target).fadeIn(600);

    });
});