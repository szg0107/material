//网络请求数据
class Request {
    baseUrl = 'https://easy-mock.com/mock/5bd149fab36f2c5eac3a9274/QM_magazine/';
    getData({url, method = 'GET', data = {}}) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.baseUrl + url,
                method: method,
                data: data,
                success: res => {
                    res.data.code === 0 ? resolve(res.data.data) : this.showError();
                },
                fail: err => {
                    reject();
                    this.showError();
                }
            })
        });
    };

    showError() {
        wx.showToast({
            title: '请求错误',
        })
    };
}
export {Request};